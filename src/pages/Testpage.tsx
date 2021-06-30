import React from 'react'
import styled from 'styled-components'
import CardStyled from '../components/card/index'
import { Web3Provider } from '@ethersproject/providers'
import ButtonStyled from '../components/button/index'
import { injectedConnector } from '../connectors'
import { useWeb3React } from '@web3-react/core'
import { useState,useEffect } from 'react'
import Vampabi from '../abi/vampabi.json'
import { useVampContract } from '../hooks/useContract'
import { Contract } from '@ethersproject/contracts'


import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
  } from 'formik';
 

import { errors, ethers } from 'ethers'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
const Wrapper = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
height: 100vh;
width: 100vw;


`


interface MyFormValues {
    address: string;
  }
 

const Testpage = () => {
    const [Tokens, setTokens] = useState<BigNumber | number | string>(0)
    const [Address, setAddress] = useState('')
    const initialValues: MyFormValues = { address: '' };

    const VampAddress = "0x4442B1e827Cc411624711c9E36CCC2fF4946065A"
    const VampContract = useVampContract(VampAddress)

    const {chainId, account, activate, active,library} = useWeb3React<Web3Provider>()
    const onClick = async() => {
        activate(injectedConnector)
        
        
      }
    const getTokens = async() => {
        try {
            if(VampContract) {
                const TokenCount = await VampContract.balanceOf(account)
                setTokens(formatEther(TokenCount))
                console.log(formatEther(TokenCount))

            }
     

        }
        catch(err){
            console.log(err)
        }
     

 
    }
    return (
        <>
           {active ? (
               <Wrapper>
               <CardStyled>
                   
                   Metamask is connected.
                   <br/>
                   Welcome {account}!
               </CardStyled>
               <CardStyled>
                   Current Vamp token count:
                   <br />
                   <br />
                   {Tokens}
                   <br />
                   <ButtonStyled onClick={getTokens}>
                       Get Tokens
                   </ButtonStyled>
                   <br/>
                   Enter Shib Addresses:
                   <Formik
         initialValues={initialValues}
         onSubmit={async(values, actions) => {
           console.log({ values, actions });
           actions.setSubmitting(false);
           await VampContract?.AddToken(values.address,1)
           console.log(await VampContract?.Shibas(values.address));

         }}
       >
         <Form>
           <label htmlFor="address">First Name</label>
           <Field id="address" name="address" placeholder="Address" />
           <button type="submit">Submit</button>
         </Form>
       </Formik>
               </CardStyled>
               </Wrapper>
           ): (
               <Wrapper>
               <CardStyled>
                       Please connect your metamask to continue.
           <ButtonStyled onClick={onClick}>
               Connect
           </ButtonStyled>

               </CardStyled>
               </Wrapper>
           )}
       
           
        </>
            
    )

}
export default Testpage