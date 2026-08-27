type ButtonType = "Link" | "Custom"

export interface Button
{
    type: ButtonType
    label: string
    link?: string
    action?: () => void
}