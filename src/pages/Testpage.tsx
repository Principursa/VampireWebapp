import React from 'react'
import styled from 'styled-components'
import CardStyled from '../components/card/index'
import { Web3Provider } from '@ethersproject/providers'
import ButtonStyled from '../components/button/index'
import { injectedConnector } from '../connectors'
import { useWeb3React } from '@web3-react/core'
import { useState,useEffect } from 'react'
import Vampabi from '../abi/vampabi.json'
import { useErc20Contract, useVampContract } from '../hooks/useContract'
import { Contract } from '@ethersproject/contracts'
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
  } from 'formik';
 
import Table from '../components/table'
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
    number: any
    address: string;
  }
 

const Testpage = () => {
    const [Tokens, setTokens] = useState<BigNumber | number | string>(0)
    const [Addresses, setAddresses] = useState([])

    const initialValues: MyFormValues = { address: '', number: 0 };

    const VampAddress = "0xdD8A4824809CDdE4F9beb1BFC58c3949d16a5Ca6"
    const VampContract = useVampContract(VampAddress)
    const Erc20Contract = useErc20Contract(VampAddress)
    const createTableArray = async ():Promise<string[][]> => {
        let Tablearr: string[][] = [];
        var VampNum = await VampContract?.getListLength()
        var ListNum: number = VampNum.toNumber()
        console.log(ListNum);
        for(let x = 0; x < ListNum; x++){
            let address: string = await VampContract?.shibaList(x)
            let newErc20 = Erc20Contract?.attach(address)
            let symbol: string = await newErc20?.symbol();
            let name: string = await newErc20?.name();
            Tablearr[x] = [name,symbol,address]
        }
        return Tablearr



    }


    const {chainId, account, activate, active,library} = useWeb3React<Web3Provider>()
    const onClick = async() => {
        activate(injectedConnector)
        
        
      }
      useEffect( () => {
          if (active) {
            const logAddress = async() => {
                setAddresses(await VampContract?.shibaList(1))
        
            }
            logAddress()


          }
      }, [active])
      useEffect(() => {
          console.log(Addresses);
      }, [Addresses])
    const getTokens = async() => {
        try {
            if(VampContract) {
                const TokenCount = await VampContract.balanceOf(account)
                setTokens(formatEther(TokenCount))
                console.log(formatEther(TokenCount))
                console.log(Addresses);

            }
     
        }
        catch(err){
            console.log(err)
        }
     
//[["Dummy","DMY","0xxxxxx"],["Testy","TST","0x7788884"]] dummy data
 
    }
    return (
        <>
           {active ? (
               <Wrapper>
               <CardStyled>
                   
                   Metamask is connected.
                   <br/>
                   Welcome {account}!
                   <br/>
                   <br/>
                   
                   <Table TableArr={createTableArray()}/>
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
Index Token address:
                   <Formik
         initialValues={initialValues}
         onSubmit={async(values, actions) => {
           console.log({ values, actions });
           actions.setSubmitting(false);
           await VampContract?.AddToken(values.address,1)
           console.log(await VampContract?.shibaList(1));
           console.log(await VampContract?.shibaList(2));


         }}
       >
         <Form>
           <label htmlFor="address"></label>
           <Field id="address" name="address" placeholder="Address" />
           <br />
           <button type="submit">Submit</button>
         </Form>
       </Formik>
       <Formik
         initialValues={initialValues}
         onSubmit={async(values, actions) => {
           console.log({ values, actions });
           actions.setSubmitting(false);
           const newErc20 = Erc20Contract?.attach(values.address)
           const balance = newErc20?.balanceOf(account)
           await newErc20?.approve(VampContract?.address,balance)
           console.log(balance);


         }}
       >
         <Form>
           <label htmlFor="address">approve tokens</label>
           <br />
           <Field id="address" name="address" placeholder="Address" />
           <br />
           <button type="submit">Submit</button>
         </Form>
       </Formik>
           


       <Formik
         initialValues={initialValues}
         onSubmit={async(values, actions) => {
           console.log({ values, actions });
           actions.setSubmitting(false);
           await VampContract?.burnShibas(values.address,values.number)
           


         }}
       >
         <Form>
           <label htmlFor="address">Burn indexed Tokens</label>
           <label htmlFor="number"></label>
           <br />
           <Field id="address" name="address" placeholder="Address" />
           <Field id="number" name="number" placeholder="Number" />
           <br />
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