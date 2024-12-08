import React from 'react';
import {Icon} from "@iconify/react";
import ValueScore from "../ValueScore";
import {Recommendation} from "../../types";
import ProviderIcon from "../ProviderIcon";
import {Badge} from "../ui/badge";

interface IProps {
  onClick?: () => void
  archived?: boolean
  data: Recommendation
}

function RecommendationCard({onClick, archived, data}: IProps) {
  return (
    <button
      onClick={onClick}
      className="text-left flex gap-4 shadow hover:shadow-xl apply-transition bg-background dark:hover:bg-primary/10 border border-border dark:text-slate-200 rounded-xl overflow-hidden items-stretch"
    >
      <div>
        <div
          data-testid="card-package"
          className={`${archived ? "bg-slate-400 dark:bg-slate-700" : "bg-primary"} text-white flex items-center justify-center h-full w-12 lg:w-36`}>
          <Icon icon="octicon:package-16" width="32" height="32"/>
        </div>
      </div>
      <div className="flex gap-4 flex-1 flex-col lg:flex-row">
        <div className="flex-1 pt-5 pr-5 lg:py-4 lg:pr-0">
          <div className="flex items-center gap-3">
            <h5 className="font-semibold flex-1 line-clamp-2 h6 lg:h5">{data.title}</h5>
            <div className="flex flex-wrap gap-2 text-slate-500 dark:text-slate-400">
              {
                data.provider.map((provider, idx) => (
                  <ProviderIcon key={idx} cloudProvider={provider}/>
                ))
              }
            </div>
          </div>
          <p className="line-clamp-3 dark:text-slate-400">
            {data.description}
          </p>
          <div className="flex gap-2 flex-wrap mt-4">
            {
              data.frameworks.slice(0, 2).map((framework, idx) => (
                <Badge key={`framework-${idx}`} variant="secondary">{framework.name}</Badge>
              ))
            }
            {
              data.frameworks.length > 2 && (
                <Badge variant="secondary">+{data.frameworks.length - 2}</Badge>
              )
            }
          </div>
        </div>
        <div className="p-3 pl-0 lg:pl-3 pt-0 lg:pt-3 w-full lg:w-auto">
          <div
            className="bg-zinc-100 dark:bg-primary-950 rounded-md text-left lg:text-center p-3 md:p-5 h-full flex flex-row lg:flex-col justify-between lg:justify-center md:max-w-none">
            <div>
              <h6 className="font-semibold p lg:h6">Impact assessment</h6>
              <p
                className="text-slate-500 dark:text-slate-400">~{data.impactAssessment.totalViolations} violations
                /
                month</p>
            </div>
            <hr className='my-3 hidden lg:block'/>
            <div
              className="flex flex-wrap flex-col md:flex-row gap-1 md:gap-3 justify-center md:items-center">
              <p className="font-semibold">Value score</p>
              <ValueScore score={Math.floor(data.score / 100 * 4)}/>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default RecommendationCard;
