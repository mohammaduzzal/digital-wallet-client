import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "react-router"
import { useGetMyTransactionQuery } from "@/redux/features/transaction/transaction.api"


export default function TransactionFilter() {

    const [searchParams,setSearchParams] = useSearchParams()
  

    const selectedTransaction = searchParams.get("types") || undefined;

    
    const { data: transactionData, isLoading: isTransactionLoading } = useGetMyTransactionQuery(undefined)

 


    const transactionOptions =Array.from(
        new Set(transactionData?.data?.map(item =>item.types))).map(type =>({
            label : type,
            value : type,
        }))
    



    const handleTransactionChange = (value : string)=>{
        const params = new URLSearchParams(searchParams)
        params.set("types", value)
        setSearchParams(params)
    }



    const handleClearFilter = () => {
        const params = new URLSearchParams(searchParams)
        params.delete("types")
        setSearchParams(params)
    }



    return (
        <div className="border border-muted rounded-md space-y-4">
            <div className="flex justify-between items-center">
                <h1>Filters</h1>
                <Button size="sm" variant="outline" onClick={handleClearFilter}>clear filter</Button>
            </div>
            <div>
                <Label className="mb-2">Transaction</Label>
                <Select onValueChange={handleTransactionChange} disabled={isTransactionLoading} value={selectedTransaction ? selectedTransaction : ""}>
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tour type</SelectLabel>
                            {
                                transactionOptions?.map((item: { value: string, label: string }) => (
                                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                ))
                            }


                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

