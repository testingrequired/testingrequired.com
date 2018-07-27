---
path: /posts/2018-03-23/modern-page-objects
title: Modern Page Objects
date: 2018-03-23
---

Page objects are a pattern used in automated testing and scripting. They abstract and decouple interacting with frontend components (inputs, buttons, images,text, links) from the automation (e.g. test, script) itself.

There are many definitions of what the pattern is there is very little out there regarding actual implementation and best practices. This results in adhoc implementations by project or even by develper.

This inconsistency makes an automation suite difficult to understand and increases barrier of entry for new maintainers. Increasing the chance of flakiness or a testing codebase that becomes a nightmare to keep up to date.

We are going to implement a base implementation for your page objects and how to use them in a modern component based web application. This can be implemented in any language but this will be in javascript.

## History

The term "page object" was coined in [2004 by Martin Fowler when blogging](https://martinfowler.com/eaaDev/WindowDriver.html) about Windows GUI testing using WindowsDriver. This pattern would later be adopted by the [Selenium community](https://github.com/SeleniumHQ/selenium/wiki/PageObjects).

## Component Based Apps

From a selenium perspective the term "page object" was in the context of document based template rendered pages. There were common elements (e.g. headers, footers) but most of the elements were unique to each page.

Modern web applications are component based with self containment and re-usability in mind. This maps perfectly to the page object pattern. This allows a single page object to be used anywhere the component is used. This also means returning page objects as properties along with elements.

## Implementation

Our base implementation will start like this:

```javascript
class PageObject {
  constructor(driver) {
    this.driver = driver
  }
}
```

If you've written page objects before this will look familiar. The webdriver instance is passed in so that elements can be queried for.

### Defining Elements

Elements must be defined as getter/computed properties. This means the defined method is called everytime the element is referenced.

```javascript
class PageObject {
  constructor(driver) {
    this.driver = driver
  }

  get someElement() {
    //...
  }
}
```

Element references can become [stale](https://www.seleniumhq.org/exceptions/stale_element_reference.jsp) if the element is removed from the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) or the page reloads. It's always safer to requery every time.

### Root Element

The root element represents the page object's logical boundary in the DOM. All other elements will be children of this element. We are using `Object.defineProperty` to set the argument `root` as the getter property for `this.root`.

```javascript
class PageObject {
  constructor(driver, root) {
    this.driver = driver

    Object.defineProperty(this, 'root', {
      enumerable: true,
      get: root,
    })
  }
}
```

### Querying for elements

We want to ensure that our queries only return child elements of `this.root`:

```javascript
class PageObject {
  constructor(driver, root) {
    this.driver = driver

    Object.defineProperty(this, 'root', {
      enumerable: true,
      get: root,
    })
  }

  element(selector) {
    return this.root.element(selector)
  }

  elements(selector) {
    return this.root.elements(selector)
  }
}
```

## Example

We are going to use our `PageObject` implementation to write a page object for a login form component in our app. This login form component is used on the front page when you aren't logged in and also appears in a modal when the login link is clicked. Since they are the same component we should be able to write one page object for both instances.

Lets define a few page objects to represent our components.

```javascript
class LoginForm extends PageObject {
  get username() {
    return this.element('#username')
  }

  get password() {
    return this.element('#password')
  }

  get submitButton() {
    return this.element('input[type=submit]')
  }
}

class LoginModal extends PageObject {
  get loginForm() {
    return new LoginForm(this.driver, () => this.element('.loginForm'))
  }
}

class FrontPage extends PageObject {
  get loginModal() {
    return new LoginModal(this.driver, () => this.element('.modal'))
  }

  get loginLink() {
    return this.element('a#login')
  }

  get loginForm() {
    return new LoginForm(this.driver, () => this.element('.loginForm'))
  }
}
```

This allows our automation to reuse `LoginForm` for both of test scenarios:

```javascript
const frontpage = new FrontPage(driver, () => driver.element('body#frontpage'))

// From the frontpage directly
frontpage.loginForm

// From the frontpage modal
frontpage.loginLink.click()
frontpage.loginModal.loginForm
```

## Advanced

This approach is flexible but verbose. Plus we are mixing element and page object properties. If we modify `element` & `elements` to accept a page object class and proxy undefined method calls to `this.root` then we will be working entirely with page objects. This is not only a much more terse syntax but enables powerful patterns. If an element requires special logic then a page object is perfect to implement this. This also allows you to override element methods like `click` or `setValue` for edge cases.

```javascript
class PageObject {
  constructor(driver, root) {
    this.driver = driver

    Object.defineProperty(this, 'root', {
      enumerable: true,
      get: root,
    })

    return new Proxy(this, {
      get: function(pageObject, prop) {
        if (prop in pageObject) {
          return pageObject[prop]
        }

        if (prop in this.root) {
          return this.root[prop]
        }

        throw new Error(
          `Property ${prop} not defined on PageObject or root element`
        )
      },
    })
  }

  element(selector, PageObjectClass = PageObject) {
    return new PageObjectClass(this.driver, () => this.root.element(selector))
  }

  elements(selector, PageObjectClass = PageObject) {
    const elements = this.root.elements(selector)
    return elements.reduce(
      (pageObjects, element, i) =>
        new PageObjectClass(this.driver, () => elements[i]),
      []
    )
  }
}
```

Our component page objects now look like this:

```javascript
class LoginForm extends PageObject {
  get username() {
    return this.element('#username')
  }

  get password() {
    return this.element('#password')
  }

  get submitButton() {
    return this.element('input[type=submit]')
  }
}

class LoginModal extends PageObject {
  get loginForm() {
    return this.element('.loginForm', LoginForm)
  }
}

class FrontPage extends PageObject {
  get loginModal() {
    return this.element('.modal', LoginModal)
  }

  get loginLink() {
    return this.element('a#login')
  }

  get loginForm() {
    return this.element('.loginForm', LoginForm)
  }
}
```

If you add `$` & `$$` alias methods for `element` & `elements` respectively:

```javascript
class PageObject {
  constructor(driver, root) {
    this.driver = driver

    Object.defineProperty(this, 'root', {
      enumerable: true,
      get: root,
    })

    return new Proxy(this, {
      get: function(pageObject, prop) {
        if (prop in pageObject) {
          return pageObject[prop]
        }

        if (prop in this.root) {
          return this.root[prop]
        }

        throw new Error(
          `Property ${prop} not defined on PageObject or root element`
        )
      },
    })
  }

  element(selector, PageObjectClass = PageObject) {
    return new PageObjectClass(this.driver, () => this.root.element(selector))
  }

  elements(selector, PageObjectClass = PageObject) {
    const elements = this.root.elements(selector)
    return elements.reduce(
      (pageObjects, element, i) =>
        new PageObjectClass(this.driver, () => elements[i]),
      []
    )
  }

  $(selector, PageObjectClass) {
    return this.element(selector, PageObjectClass)
  }

  $$(selector, PageObjectClass) {
    return this.elements(selector, PageObjectClass)
  }
}
```

It becomes even terser:

```javascript
class LoginForm extends PageObject {
  get username() {
    return this.$('#username')
  }

  get password() {
    return this.$('#password')
  }

  get submitButton() {
    return this.$('input[type=submit]')
  }
}

class LoginModal extends PageObject {
  get loginForm() {
    return this.$('.loginForm', LoginForm)
  }
}

class FrontPage extends PageObject {
  get loginModal() {
    return this.$('.modal', LoginModal)
  }

  get loginLink() {
    return this.$('a#login')
  }

  get loginForm() {
    return this.$('.loginForm', LoginForm)
  }
}
```

### Solving Edge Cases

A previous project I had worked on was writing automation for a vendor web app to automate data entry and validate the app's behavior. I spent a few weeks walking through a manual testing plan, mapping the DOM to page objects while converting them to automated tests. A month after completing this test suite the vendor released a redesign implemented in Bootstrap.

We will save why we are writing automated tests for a vendor product and the lack of communication for another post. Luckily the page objects were written in a way that most of them continued to work. This did break all of the form related page objects. Bootstrap form elements don't use the naive form elements. This is for ease of styling. On top of that selenium was having issues correctly reporting element's visibility. If an element is not visible then selenium will not let you interact with it.

Implementing the pattern above allows you to solve these issues but overriding element methods.

Lets start with the Bootstrap form inputs:

```javascript
class BootstrapInput extends PageObject {
  setValue(value) {
    this.driver.execute(`return arguments[0].value = '${value}'`, this.root)
  }
}
```

Convert our login form page object:

```javascript
class LoginForm extends PageObject {
  get username() {
    return this.$('#username', BootstrapInput)
  }

  get password() {
    return this.$('#password', BootstrapInput)
  }

  get submitButton() {
    return this.$('input[type=submit]')
  }
}
```

Or maybe your trying to click on an element you can see but selenium reports it's not visible:

```javascript
class ShimClickable extends PageObject {
  click(value) {
    this.driver.execute(`return arguments[0].click()`, this.root)
  }
}

class LoginForm extends PageObject {
  get username() {
    return this.$('#username', BootstrapInput)
  }

  get password() {
    return this.$('#password', BootstrapInput)
  }

  get submitButton() {
    return this.$('input[type=submit]', ShimClickable)
  }
}
```

## Conclusion

I've had huge success implementing this pattern across multiple projects. It makes writing page objects and automation simple and accessible.
