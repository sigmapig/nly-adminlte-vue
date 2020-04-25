import { nlyPluginFactory } from "../utils/plugins";
import { VNlyCollapseSidebarPlugin } from "./sidebarcollapse";
import { VNlyCardPlugin } from "./card";
import { VNlyTogglePlugin } from "./toggle";
import { VNlyModalPlugin } from "./modal";
import { VNlyTooltipPlugin } from "./tooltip";
import { VNlyScrollspyPlugin } from "./scrollspy";

export const directivesPlugin = nlyPluginFactory({
  plugins: {
    VNlyCardPlugin,
    VNlyCollapseSidebarPlugin,
    VNlyTogglePlugin,
    VNlyModalPlugin,
    VNlyTooltipPlugin,
    VNlyScrollspyPlugin
  }
});
