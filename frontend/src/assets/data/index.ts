import {CloudProvider, INavItem} from "../../types";

export const navItems: INavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "lucide:layout-dashboard"
  },
  {
    title: "Recommendations",
    href: "/recommendations",
    icon: "heroicons:sparkles"
  },
  {
    title: "Policies",
    href: "/policies",
    icon: "solar:clipboard-list-linear"
  },
  {
    title: "Events",
    href: "/events",
    icon: "fluent:document-table-search-24-regular"
  },
  {
    title: "Waivers",
    href: "/waivers",
    icon: "ph:seal-warning"
  },
];

export const providers: Map<CloudProvider, string> = new Map([
  [CloudProvider.AZURE, "Azure"],
  [CloudProvider.AWS, "Amazon Web Service"],
  [CloudProvider.UNSPECIFIED, "Unspecified"],
]);
