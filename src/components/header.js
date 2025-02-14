import styled from 'styled-components';

export default styled.div`
  background: #333;
  color: #fff;
  margin-bottom: 0;
  text-align: center;
  padding: 1em;
  height: ${props => (props.fullscreen ? `100vh` : `inherit`)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  a {
    color: #fff;
    text-decoration: none;
  }

  h1 {
    font-size: ${props => (props.fullscreen ? `4em` : `3em`)};
    margin-bottom: ${props => (props.fullscreen ? `.25em` : `0`)};

    @media (max-width: 800px) {
      font-size: ${props => (props.fullscreen ? `4em` : `2.5em`)};
    }

    @media (max-width: 400px) {
      font-size: ${props => (props.fullscreen ? `4em` : `1.75em`)};
    }
  }

  @media (max-width: 800px) {
    margin-bottom: 1em;
  }
`;
