type ButtonType = "Link" | "Custom"
type ButtonColor = "Primary" | "Default"
type LabelType = "Text" | "GoogleIcon" | "LocalIcon"

export interface Button
{
    type: ButtonType
    color: ButtonColor
    labelType: LabelType
    label: string
    link?: string
    action?: () => void
}