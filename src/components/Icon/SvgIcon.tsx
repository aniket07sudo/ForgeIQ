import DocumentIcon from "../../assets/icons/document.svg?react";
import DraftIcon from "../../assets/icons/draft.svg?react";
import AIIcon from "../../assets/icons/ai.svg?react";
import TickIcon from "../../assets/icons/tick.svg?react";
import SyncIcon from "../../assets/icons/sync.svg?react";
import Epic from "../../assets/icons/epic.svg?react";
import StoryIcon from "../../assets/icons/story.svg?react";
import StoryPoints from "../../assets/icons/storypoint.svg?react";
import TechnicalTask from "../../assets/icons/technicaltask.svg?react";
import Plus from "../../assets/icons/plus.svg?react";
import Jira from "../../assets/icons/jira.svg?react";
import Link from "../../assets/icons/link.svg?react";
import Cancel from "../../assets/icons/cancel.svg?react";
import Info from "../../assets/icons/info.svg?react";
import Edit from "../../assets/icons/edit.svg?react";
import Check from "../../assets/icons/check.svg?react";
import Save from "../../assets/icons/save.svg?react";

const icons = {
  document: DocumentIcon,
  draft: DraftIcon,
  ai: AIIcon,
  tick: TickIcon,
  sync: SyncIcon,
  epic: Epic,
  story: StoryIcon,
  SP: StoryPoints,
  technicalTask: TechnicalTask,
  plus: Plus,
  jira: Jira,
  link: Link,
  cancel: Cancel,
  info: Info,
  edit: Edit,
  check: Check,
  save:Save
};

export type SVGIcons = keyof typeof icons;

type Props = {
  name: SVGIcons;
  size?: number;
  className?: string;
  color?: string;
};

export default function SvgIcon({
  name,
  size = 20,
  className,
  color = "currentColor",
}: Props) {
  const Svg = icons[name];

  return <Svg width={size} height={size} className={className} color={color} />;
}
