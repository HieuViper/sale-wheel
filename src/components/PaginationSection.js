"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { deleteAttributeInSearchParams } from "@/lib/utils";

export default function PaginationSection(props) {
  const searchParams = props.searchParams;

  const objectName = props.objectName;

  const total = parseInt(props.total);
  const pageIndex = parseInt(props.pageIndex);
  const pageSize = parseInt(props.pageSize);

  const pagesCount = Math.ceil(total / pageSize);

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = pageIndex - offsetNumber; i <= pageIndex + offsetNumber; i++) {
    if (i >= 1 && i <= pagesCount) {
      pageNumbers.push(i);
    }
  }

  const startIndex = (pageIndex - 1) * pageSize + 1;
  const endIndex = Math.min(total, pageIndex * pageSize);

  const searchParamsWithoutPagainate = deleteAttributeInSearchParams(
    searchParams,
    ["pageIndex", "pageSize"]
  );

  if (pagesCount <= 1) return null;

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="text-xs text-muted-foreground w-full my-auto">
          Showing{" "}
          <strong>
            {startIndex}-{endIndex}
          </strong>{" "}
          of <strong>{total}</strong> {objectName}
        </div>
        <ChoosePageSize
          currentPageSize={pageSize}
          currentPageIndex={pageIndex}
          searchParamsWithoutPagainate={searchParamsWithoutPagainate}
        />
      </div>

      <div className="flex justify-center items-center">
        {/* pagination */}
        <Pagination className="w-fit">
          <PaginationContent>
            {pageIndex > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={
                    searchParamsWithoutPagainate
                      ? `?${searchParamsWithoutPagainate}&pageIndex=${
                          pageIndex - 1
                        }&pageSize=${pageSize}`
                      : `?pageIndex=${pageIndex - 1}&pageSize=${pageSize}`
                  }
                />
              </PaginationItem>
            )}
            {pageNumbers.map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={
                    searchParamsWithoutPagainate
                      ? `?${searchParamsWithoutPagainate}&pageIndex=${pageNumber}&pageSize=${pageSize}`
                      : `?pageIndex=${pageNumber}&pageSize=${pageSize}`
                  }
                  isActive={pageNumber === pageIndex}
                  className="cursor-pointer"
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            {pageIndex < pagesCount && (
              <PaginationItem>
                <PaginationNext
                  href={
                    searchParamsWithoutPagainate
                      ? `?${searchParamsWithoutPagainate}&pageIndex=${
                          pageIndex + 1
                        }&pageSize=${pageSize}`
                      : `?pageIndex=${pageIndex + 1}&pageSize=${pageSize}`
                  }
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
const ChoosePageSize = ({
  currentPageSize,
  currentPageIndex,
  searchParamsWithoutPagainate,
}) => {
  const array = [5, 20, 30];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {currentPageSize} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {array.map((item) => (
          <DropdownMenuItem key={item} asChild>
            <Link
              href={
                searchParamsWithoutPagainate
                  ? `?${searchParamsWithoutPagainate}&pageIndex=${currentPageIndex}&pageSize=${item}`
                  : `?pageIndex=${currentPageIndex}&pageSize=${item}`
              }
            >
              {item}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
