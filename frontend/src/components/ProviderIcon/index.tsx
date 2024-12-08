import React, {useMemo} from 'react';
import {CloudProvider} from "../../types";
import {Icon} from "@iconify/react";

interface IProps {
  cloudProvider: CloudProvider
}

function ProviderIcon({cloudProvider}: IProps) {
  const icon = useMemo(() => {
    switch (cloudProvider) {
      case CloudProvider.AWS:
        return "mdi:aws";

      case CloudProvider.AZURE:
        return "lineicons:azure";

      case CloudProvider.UNSPECIFIED:
      default:
        return "bxl:google-cloud";
    }
  }, [cloudProvider]);

  return (
    <Icon data-icon={icon} icon={icon} width="24" height="24"/>
  );
}

export default ProviderIcon;
