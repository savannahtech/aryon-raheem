import React, {useMemo, useState} from 'react';
import Container from "../../components/Container";
import RecommendationCard from "../../components/RecommendationCard";
import Modal from "../../components/Modal";
import RecommendationDetail from "./detail";
import recommendationService from "../../services/recommendation.service";
import {Recommendation, RecommendationsDataResponse} from "../../types";
import {Icon} from "@iconify/react";
import {Link} from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import {InfiniteData, useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import RecommendationsFilter from "./filter";
import useFilterContext from "../../context/filterContext/hook";
import {Button} from "../../components/ui/button";

interface IProps {
  archived?: boolean;
}

function RecommendationsPage({archived}: IProps) {
  const [activeRecommendation, setActiveRecommendation] = useState<Recommendation | undefined>();
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const {tags} = useFilterContext();
  const queryClient = useQueryClient();

  const cacheKey = useMemo(() => ["recommendations", (archived ? "archived" : "unarchived"), debouncedTerm, JSON.stringify(tags)], [archived, debouncedTerm, tags]);

  const {
    data, fetchNextPage, hasNextPage, isLoading
  } = useInfiniteQuery<RecommendationsDataResponse, Error, InfiniteData<RecommendationsDataResponse, unknown>, string[], string>({
      queryKey: cacheKey,
      queryFn: ({pageParam}) => recommendationService.getRecommendations({
        archive: archived,
        cursor: pageParam,
        search: debouncedTerm,
        tags
      }),
      retry: 0,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage?.pagination?.cursor?.next ?? undefined,
      initialPageParam: "",
    }
  );

  const handleRemoveItem = (id: string) => {
    queryClient.setQueryData<InfiniteData<RecommendationsDataResponse>>(cacheKey, (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page, index) => ({
          ...page,
          pagination: {...page.pagination, totalItems: page.pagination.totalItems - (index === 0 ? 1 : 0)},
          data: page.data.filter((item) => item.recommendationId !== id),
        })),
      };
    });
  };

  const flatData = useMemo(() => {
    if (data) {
      return data.pages.reduce<Recommendation[]>((newArr, p, idx) => newArr.concat(p.data.slice(idx === 0 ? 0 : 1)), []);
    }
    return [];
  }, [data]);

  const closeModal = () => {
    setActiveRecommendation(undefined);
  }

  return (
    <Container>
      <div className="flex items-center mb-10">
        <h4 className="h5 md:h4">Recommendations</h4>
        <div className="ml-auto">
          <Link to={archived ? "/recommendations" : "/recommendations/archive"}>
            <Button type="button">
              <Icon icon="f7:archivebox" width={20} height={20}/>
              <span>{archived ? "Active" : "Archive"}</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="my-10 flex justify-between flex-wrap gap-4 items-center">
        <RecommendationsFilter setDebouncedTerm={setDebouncedTerm}/>
        <p className="text-slate-500 w-full md:w-auto">
          Showing {flatData.length} of {data?.pages[0]?.pagination.totalItems ?? 0}
        </p>
      </div>

      {
        isLoading ? (
          <div className="py-8 flex flex-col items-center gap-4 text-slate-400">
            <Icon icon="line-md:loading-twotone-loop" width={64} height={64}/>
            <p>Loading...</p>
          </div>
        ) : flatData.length === 0 ? (
          <div className="py-8 flex flex-col items-center gap-4 text-slate-400">
            <Icon icon="qlementine-icons:empty-slot-16" width={64} height={64}/>
            <p>No recommendations</p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={flatData.length}
            next={fetchNextPage}
            hasMore={hasNextPage ?? false}
            scrollThreshold="600px"
            loader={<p className="small text-center text-slate-500">Loading...</p>}
            endMessage={
              <p className="small text-center text-slate-500">No more recommendations</p>
            }
            className="grid gap-4"
          >
            {
              flatData.map(recommendation => (
                <RecommendationCard
                  key={recommendation.recommendationId}
                  data={recommendation}
                  onClick={() => setActiveRecommendation(recommendation)}
                  archived={archived}
                />
              ))
            }
          </InfiniteScroll>
        )
      }

      <Modal isOpen={!!activeRecommendation} onClose={closeModal}>
        <RecommendationDetail
          data={activeRecommendation}
          onClose={closeModal}
          archived={archived}
          handleRemoveItem={handleRemoveItem}
        />
      </Modal>
    </Container>
  );
}

export default RecommendationsPage;
