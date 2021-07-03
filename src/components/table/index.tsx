import React, { Props } from 'react'
import styled from 'styled-components'
import { useState,useEffect } from 'react'

const Wrapper = styled.table`
width: 5em;
font-size: .7em;
border-collapse: collapse;
th {
    text-align: left;
}
td {
    text-align: left;
}
th, td {
    border: 1px solid white;
    padding: 10px;
}



`
interface Propy {
    TableArr: Promise<string[][]>
}

const Table:React.FC<Propy> = (props) => {
    const [Table, setTable] = useState<string[][]>()

    useEffect(() => {
        const setUp = async() => {
            
        setTable(await props.TableArr)

        }
        setUp()


    }, [])




    return (
        <Wrapper>
             <tr>
                           <th>
                               Name
                           </th>
                           <th>
                               Symbol
                           </th>
                           <th>
                               Address
                           </th>
                           </tr>



                           {Table && Table.map((item,index) => {
                               return (
                                   <tr>
                                            {item.map((item)=> {
                                                return (
                                                    
                                                <td>
                                                {item}
                                            </td>


                                                )



                                            })}
                                       
                                   </tr>
                               )
                          

                           }

                           )}
{/*                            <td>{props.TableArr[0][0]}</td>
                           <td>{props.TableArr[0][1]}</td>
                           <td>{props.TableArr[0][2]}</td> */}
            
        </Wrapper>
    )
}

export default Table
