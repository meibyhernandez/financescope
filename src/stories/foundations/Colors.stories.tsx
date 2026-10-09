import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Foundations/Colors",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => (
    <main
      style={{
        minHeight: "100vh",
        padding: "var(--space-8)",
        backgroundColor: "var(--color-bg-page)",
        color: "var(--color-text-primary)",
      }}
    >
      <h1 style={{ fontFamily: "var(--font-display)" }}>
        FinScope color system
      </h1>
    </main>
  ),
};