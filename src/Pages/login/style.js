import styled from 'styled-components';


export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 15.5em;
    height: 22.5em;
    border: 2px solid #24135a;
    border-bottom-left-radius: 1.5em;
    border-top-right-radius: 1.5em;
    box-shadow:
      -10px 0px 0px #24135a,
      -10px 5px 5px rgb(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    transition: all 0.25s ease;
  }

  #login-area,
  #email-area,
  #password-area,
  #footer-area {
    position: relative;
    z-index: 2;
  }

  #login-area {
    width: 100%;
    height: 3.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  #login-area p {
    top: 0.35em;
    font-size: 1.5em;
    font-weight: bold;
    position: absolute;
    z-index: 2;
  }

  #login-area #behind {
    top: 60%;
    font-size: 1em;
    font-weight: bold;
    position: absolute;
    z-index: 1;
  }

  #behind {
    position: absolute;
    left: 1em;
    color: #6041bf;
  }

  #email-area {
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
    height: 5em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 1em;
    transition: all 0.25s ease;
  }

  #email-area input {
    width: 100%;
    border: 2px solid #6041bf;
    border-radius: 0.5em;
    height: 2.5em;
    padding-left: 1em;
    font-size: 0.95em;
    font-weight: 100;
    transition: all 0.5s ease;
    outline: none;
    box-shadow: 0px 5px 5px -3px rgb(0, 0, 0, 0.2);
  }

  #password-area {
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
    height: 6em;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    transition: all 0.25s ease;
  }

  #password-area input {
    width: 100%;
    border: 2px solid #6041bf;
    font-size: 0.95em;
    border-radius: 0.5em;
    height: 2.5em;
    padding-left: 1em;
    transition: all 0.25s ease;
    outline: none;
    box-shadow: 0px 5px 5px -3px rgb(0, 0, 0, 0.2);
  }

  #password-area a {
    padding-top: 0.5em;
    font-size: 0.8em;
    font-weight: bold;
    transition: all 0.25s ease;
    color: #6041bf;
  }

  #footer-area {
    margin-top: 0%;
    padding-top: 0%;
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
    height: 7em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #6041bf;
    transition: all 0.25s ease;
  }

  #footer-area button {
    width: 100%;
    border: 2px solid #6041bf;
    border-radius: 0.5em;
    height: 2.5em;
    padding-left: 1em;
    font-size: 0.95em;
    font-weight: 100;
    transition: all 0.25s ease;
    color: white;
    font-weight: bold;
    background-color: #6041bf;
    box-shadow: 0px 5px 5px -3px rgb(0, 0, 0, 0.2);
  }

  #footer-area p,
  #footer-area a {
    font-size: 0.8em;
    transition: all 0.25s ease;
  }

  #text-inside {
    padding-top: 0.5em;
    display: flex;
  }

  #link {
    padding-left: 0.1em;
    font-weight: bold;
  }

  #background-color {
    width: 100%;
    height: 3.5em;
    background-color: #6041bf;
    position: absolute;
    top: 0em;
    z-index: 1;
    transition: all 0.5s ease;
    box-shadow: inset 5px 0px #24135a;
  }

  #link-circle {
    width: 100%;
    height: 4.5em;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-left: 15%;
    padding-right: 15%;
  }

  #link-circle svg {
    transition: all 0.25s ease;
  }

  #whitefilter {
    width: 3.5em;
    height: 3.5em;
    top: 2.5px;
    right: 2.5px;
    position: absolute;
    z-index: 2;
    border-top-right-radius: 1.25em;
    box-shadow: 35px -35px 0px -1px white;
  }

  ::placeholder {
    color: #6041bf;
    font-weight: bold;
  }

  .form:hover {
    width: 16em;
    height: 23em;
  }

  #email-area:hover ~ #background-color {
    height: 4.2em;
    transform: translateY(4em);
  }

  #email-area:hover,
  #password-area:hover,
  #footer-area:hover {
    padding-left: 5%;
    padding-right: 5%;
  }

  #email-area:hover p {
    color: white;
  }

  #email-area:hover input {
    color: white;
    border: 2px solid white;
    background-color: #6041bf;
    height: 3em;
  }

  #email-area:hover ::placeholder {
    color: white;
  }

  #password-area:hover ~ #background-color {
    height: 5.5em;
    transform: translateY(7.8em);
  }

  #footer-area:hover ~ #background-color {
    height: 5.9em;
    transform: translateY(13.2em);
  }

  #password-area:hover p {
    color: white;
  }

  #password-area:hover a {
    color: white;
    padding-right: 5%;
  }

  #password-area:hover input {
    color: white;
    border: 2px solid white;
    background-color: #6041bf;
    height: 3em;
  }

  #password-area:hover ::placeholder {
    color: white;
  }

  #footer-area:hover p,
  #footer-area:hover a {
    color: white;
  }

  #footer-area:hover button {
    border: 2px solid white;
    background-color: #6041bf;
    height: 3em;
  }

  #footer-area button:active {
    color: #6041bf;
    background-color: white;
    width: 90%;
  }

  #link-circle svg:hover {
    transform: scale(1.25);
    margin: 0.5em;
  }
`;
