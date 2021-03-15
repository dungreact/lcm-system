import * as React from 'react';
import styled from 'styled-components';
import Icon from '@ant-design/icons';
import { Facebook } from '../../components/Logo/Facebook';
import { Goolge } from '../../components/Logo/Google';
import { Github } from '../../components/Logo/Github';

const QuickLogin = () => {

  return (
    <QuickLoginContainer>
      <span>Đăng nhập nhanh: </span>
      <Icon component={Facebook} />
      <a href="http://localhost:3000/api/users/google">
        <Icon component={Goolge} />
      </a>
      <Icon component={Github} />
    </QuickLoginContainer>
  )
};

const QuickLoginContainer = styled.div`
    width: 360px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    padding-bottom: 20px;

    span {
        padding-right: 10px;
    }
`

export default QuickLogin;