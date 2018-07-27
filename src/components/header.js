import styled from 'styled-components';

export default styled.div`
  background: #333;
  color: #fff;
  margin-bottom: ${props => (props.fullscreen ? `0` : `3em`)};
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

  @media (max-width: 800px) {
    margin-bottom: 1em;
  }
`;
