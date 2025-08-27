import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { useSearchParams } from "react-router";

export default function FilterTransaction() {
    const [searchParams, setSearchParams] = useSearchParams()


    const selectedTransaction = searchParams.get("types") || undefined;


    const { data: transactionData, isLoading: isTransactionLoading } = useGetAllTransactionQuery({limit : 1000})

   

    const transactionOptions = Array.from(
        new Set(transactionData?.data?.map(item => item.types))).map(type => ({
            label: type,
            value: type,
        }))
  

    const handleTransactionChange = (value: string) => {
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
        <div className="transaction flex items-end gap-4 p-4">

            <div className="flex-1">

                <Select onValueChange={handleTransactionChange} disabled={isTransactionLoading} value={selectedTransaction ? selectedTransaction : ""}>
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>transaction types</SelectLabel>
                            {
                                transactionOptions?.map((item: { value: string, label: string }) => (
                                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                ))
                            }


                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Button variant="outline" onClick={handleClearFilter}>clear filter</Button>
            </div>
        </div>
    )
}
