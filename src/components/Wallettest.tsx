import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { injectedConnector } from '../connectors'
import { Web3Provider } from '@ethersproject/providers'
import styled from 'styled-components'
import { Card } from 'rebass'
import { Button } from 'rebass'
const Wrapper = styled(Card)`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');


font-family: 'Roboto', sans-serif;
height: 500px;
width: 500px;
::selection {
  background-color: #30ad7d;
}
font-size: 1.1rem;
border-radius: 10px;
background-color: #604cb913;   
backdrop-filter: blur(4px);
color: white;
padding: 2rem;
/* border: 5px solid;
border-image-slice: 1;
border-width: 4px;
border-color: #4343921c; */
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
box-shadow:0px 8px 17px 2px rgba(0,0,0,0.14) , 0px 3px 14px 2px rgba(0,0,0,0.12) , 0px 5px 5px -3px rgba(0,0,0,0.2); 
`


const StyledButton = styled(Button)`
background-color: #36368114;
padding: 10px;
font-family: 'Roboto', sans-serif;

transition: all 1s ease-out;
box-shadow:0px 8px 17px 2px rgba(0,0,0,0.14) , 0px 3px 14px 2px rgba(0,0,0,0.12) , 0px 5px 5px -3px rgba(0,0,0,0.2); 
:hover {
  background-color: #2e2ec430;

}

`

const Wallettest = () => {
    const {chainId, account, activate, active} = useWeb3React<Web3Provider>()
    const onClick = () => {
        activate(injectedConnector)
      }
      
    return (
      <>
        <Wrapper>
          test text
                  <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      {active ? (
        <div>✅ </div>
      ) : (
        <StyledButton type="button" onClick={onClick}>
          Connect
        </StyledButton>
      )}





            
        </Wrapper>
        </>
    )
}

export default Wallettest
