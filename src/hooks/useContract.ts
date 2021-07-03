import VampAbi from "../abi/vampabi.json"
import { Contract } from "ethers"
import { useMemo } from "react"
import { useWeb3React } from "@web3-react/core"
import { getContract } from "../utils/getContract"
import { VampyAddresses } from "../constants/VampyAddresses"
import erc20abi from '../abi/erc20abi.json'
export function useContract<T extends Contract = Contract>(
    addressOrAddressMap: string | { [chainId: number]: string } | undefined,
    ABI: any,
    withSignerIfPossible = true
  ): T | null {
    const { library, account, chainId } = useWeb3React()
  
    return useMemo(() => {
      if (!addressOrAddressMap || !ABI || !library || !chainId) return null
      let address: string | undefined
      if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
      else address = addressOrAddressMap[chainId]
      if (!address) return null
      try {
        return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
  }
  


  export function useVampContract(address: any): Contract | null {
    return useContract(address, VampAbi, true)
  }
  export function useErc20Contract(address: any): Contract | null {
    return useContract(address, erc20abi, true)
  }
  