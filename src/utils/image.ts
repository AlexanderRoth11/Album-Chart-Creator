import Vibrant from "node-vibrant";

export const getImageGradient = async (imageUrl: string): Promise<string> => {
  try {
    const palette = await Vibrant.from(imageUrl).getPalette();
    const vibrant = palette.Vibrant ? palette.Vibrant.rgb : [0, 0, 0];

    return `linear-gradient(to top, ${darkenColor(vibrant, 0.2)}, ${darkenColor(vibrant, 0.25)}, ${darkenColor(vibrant, 0.3)}, ${darkenColor(vibrant, 0.4)})`;
  } catch (error) {
    return "";
  }
};

function darkenColor(rgb: number[], factor: number) {
  const newR = Math.max(0, Math.round(rgb[0] * factor));
  const newG = Math.max(0, Math.round(rgb[1] * factor));
  const newB = Math.max(0, Math.round(rgb[2] * factor));

  return `rgba(${newR}, ${newG}, ${newB})`;
}
