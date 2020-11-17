import styled from "styled-components";


export const Wrapper = styled.div `
  text-align: center;
`;

export const Light = styled.span `
  font-weight: 200;
  font-size: 0.6em;
`;

export const Container = styled.div `
  width: 75%;
  margin: auto;
`;

export const Bar = styled.div `
  background-color: #f2e3ff;
  width: 100%;
  height: 60px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
`;

export const Heading = styled.h1 `
  font-size: 2em;
  font-weight: 600;
  color: rgba(77, 1, 180, 1);
`;
export const FileUpload = styled.div `
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  transition: 0.5s;
  background: linear-gradient(
    90deg,
    rgba(77, 1, 180, 1) 0%,
    rgba(101, 1, 180, 1) 100%
  );

  color: white;
  padding: 30px;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4em;
  position: fixed;
  right: 3%;
  bottom: 5%;
`;

export const TopBar = styled.div `
  width: 100%;

  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  height: 150px;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const Account = styled.div `
  background: linear-gradient(
    90deg,
    rgba(77, 1, 180, 1) 0%,
    rgba(101, 1, 180, 1) 100%
  );
  height: 150px;
  width: 30%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
`;
export const Flex = styled.div `
  display: flex;
  padding: 10px 40px;
  color: #893ec5;
  font-weight: 700;
  font-size: 1.5em;
  justify-content: space-between;
`;
export const White = styled.p `
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

export const Holder = styled.div `
  width: 30%;
`;

export const SearchHolder = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const AlignCenter = styled.div `
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 1.5em;
  font-weight: 600;
`;
export const SmallButton = styled.div `
  background: linear-gradient(
    90deg,
    rgba(77, 1, 180, 1) 0%,
    rgba(101, 1, 180, 1) 100%
  );
  transition: 0.5s;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.6em;
  font-weight: 500;
  color: #f2e3ff;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export const Align = styled.div `
  margin: 25px;
  display: flex;
  margin-left: 45px;
`;
export const FileList = styled.div `
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom:100px;
`;

export const File = styled.div `
  width: 300px;
  margin: 15px;
  height: 300px;
  border-radius: 8px;
  border: 1px solid #b487d9;
`;