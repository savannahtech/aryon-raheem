import React, {useCallback, useState} from 'react';
import {Badge} from "../../components/ui/badge";
import {Icon} from "@iconify/react";
import ValueScore from "../../components/ValueScore";
import {Recommendation} from "../../types";
import ProviderIcon from "../../components/ProviderIcon";
import recommendationService from "../../services/recommendation.service";
import toast from "react-hot-toast";
import {providers} from "../../assets/data";
import {Button} from "../../components/ui/button";
import {Loader2} from "lucide-react";
import utils from "../../utils";

interface IProps {
  data?: Recommendation;
  onClose?: () => void;
  archived?: boolean;
  handleRemoveItem?: (id: string) => void;
}

function RecommendationDetail({data, onClose, archived, handleRemoveItem}: IProps) {
  const [toggling, setToggling] = useState(false);

  const toggleArchive = useCallback(() => {
    if (!data?.recommendationId) return;

    setToggling(true);
    const action = archived ? recommendationService.unarchive : recommendationService.archive;
    action(data.recommendationId)
      .then(res => {
        toast.success(archived ? `Recommendation unarchived successfully` : `Recommendation archived successfully`);
        !!handleRemoveItem && handleRemoveItem(data.recommendationId)
        setToggling(false)
        onClose && onClose();
      })
      .catch(err => {
        setToggling(false);
        utils.handleError(err);
      })
  }, [archived, data?.recommendationId, onClose]);

  if (!data) return null;

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="p-5 md:p-10 flex-1 overflow-y-auto">
        <div className="flex gap-4 items-start">
          <div>
            <div
              className="h-16 w-16 bg-primary text-white flex items-center justify-center p-5 rounded-md">
              <Icon icon="tabler:packages" width="32" height="32"/>
            </div>
          </div>
          <div className="flex-1">
            <h5 className="font-semibold">{data.title}</h5>
            <div className="flex items-center flex-wrap gap-x-5 gap-y-2 mt-4">
              <div className="inline-flex gap-3 items-center">
                <p className="font-semibold">Value score</p>
                <ValueScore score={Math.floor(data.score / 100 * 4)}/>
              </div>

              {
                data.provider.map((provider, idx) => (
                  <div key={idx} className="inline-flex gap-1 items-center">
                    <ProviderIcon cloudProvider={provider}/>
                    <p className="font-semibold">{providers.get(provider)}</p>
                  </div>
                ))
              }

            </div>
          </div>
          <div className="self-start">
            <Button onClick={onClose} variant="ghost" size="icon">
              <Icon icon="ic:sharp-close" width={32} height={32}/>
            </Button>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mt-4">
          {
            data.frameworks.map((framework, idx) => (
              <Badge key={`framework-${idx}`} variant="secondary">{framework.name}</Badge>
            ))
          }
        </div>

        <hr className="my-5"/>

        <p>
          {data.description}
        </p>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <Icon icon="octicon:package-16" width={20} height={20}/>
            <h6 className="font-semibold">Resources enforced by policy</h6>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            {
              data.affectedResources.map((resource, idx) => (
                <Badge key={`resource-${idx}`} variant="secondary">{resource.name}</Badge>
              ))
            }
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <Icon icon="octicon:package-16" width={20} height={20}/>
            <h6 className="font-semibold">Reasons</h6>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            {
              data.reasons.map((reason, idx) => (
                <Badge key={`reason-${idx}`} variant='secondary'>{reason}</Badge>
              ))
            }
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon="fe:bar-chart" width={20} height={20}/>
            <h6 className="font-semibold">Impact Assessment</h6>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div
              className="border border-slate-200 dark:border-primary-800 dark:bg-primary-900 bg-slate-100 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <p>Overall</p>
                <Icon icon="ph:seal-warning" width={20} height={20}/>
              </div>
              <div className="flex items-center justify-between font-semibold mt-2">
                <h6>Violations</h6>
                <h6>{data.totalHistoricalViolations}</h6>
              </div>
            </div>
            <div
              className="border border-slate-200 dark:border-primary-800 dark:bg-primary-900 bg-slate-100 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <p>Most impacted scope</p>
                <Icon icon="ph:seal-warning" width={20} height={20}/>
              </div>
              <div className="flex items-center justify-between font-semibold mt-2">
                <div>
                  <h6>{data.impactAssessment.mostImpactedScope.name}</h6>
                  <p
                    className="leading-none font-normal small text-slate-500 dark:text-slate-400">({data.impactAssessment.mostImpactedScope.type})</p>
                </div>
                <h6>{data.impactAssessment.mostImpactedScope.count}</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon="ph:book-open" width={20} height={20}/>
            <h6 className="font-semibold">Further Reading</h6>
          </div>
          {
            data.furtherReading.map((reading, idx) => (
              <p key={idx}>
                <a
                  href={reading.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3"
                >
                  <span>{reading.name}</span>
                  <Icon icon="heroicons-outline:external-link" width={18} height={18}/>
                </a>
              </p>
            ))
          }
        </div>
      </div>

      <hr/>

      <div className="flex justify-end items-center gap-4 p-5">
        <Button type="button" data-testid="archive-button" onClick={toggleArchive} variant="outline"
                disabled={toggling}>
          {toggling ? (
            <Loader2 className="animate-spin"/>
          ) : (
            <Icon icon="f7:archivebox" width={20} height={20}/>
          )}
          <span>{archived ? "Unarchive" : "Archive"}</span>
        </Button>
        <Button>Configure Policy</Button>
      </div>
    </div>
  );
}

export default RecommendationDetail;
