import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { ICoins } from "@/services/list-coins"
import { SetStateAction, useCallback } from "react"

export default function TablePagination({ page, setPage, coins, perPage }: { page: number, setPage: (value: SetStateAction<number>) => void, coins: ICoins[], perPage: number }) {
    const handlePreviousPage = useCallback(() => {
        setPage(prev => Math.max(prev - 1, 1));
    }, [setPage]);

    const handleNextPage = useCallback(() => {
        setPage(prev => prev + 1);
    }, [setPage]);
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePreviousPage}
                        className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        onClick={handleNextPage}
                        className={coins.length < perPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}