import React, { useCallback, useEffect, useState, useMemo } from 'react';
import ReactSlider from 'react-slider';

interface DoubleRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (minVal: number, maxVal: number) => void;
}

const DoubleRangeSlider: React.FC<DoubleRangeSliderProps> = React.memo(({ min, max, value, onChange }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = useCallback((newValues: [number, number]) => {
    console.log('handleChange - newValues:', newValues);
    setInternalValue(newValues);
  }, []);

  const handleAfterChange = useCallback((newValues: [number, number]) => {
    console.log('handleAfterChange - newValues:', newValues);
    const clampedValues: [number, number] = [
      Math.max(min, Math.min(max, newValues[0])),
      Math.max(min, Math.min(max, newValues[1]))
    ];
    onChange(clampedValues[0], clampedValues[1]);
  }, [onChange, min, max]);

  const sliderProps = useMemo(() => ({
    min,
    max,
    value: internalValue,
    onChange: handleChange,
    onAfterChange: handleAfterChange,
    ariaLabel: ['下限', '上限'] as [string, string],
    ariaValuetext: (state: { valueNow: number }) => `滑塊值 ${state.valueNow}`,
    pearling: true,
    minDistance: 50,
  }), [min, max, internalValue, handleChange, handleAfterChange]);

  console.log('渲染 - value:', internalValue);

  return (
    <div className="w-full h-16 relative">
      <ReactSlider
        {...sliderProps}
        className="absolute top-1/2 transform -translate-y-1/2 w-full"
        thumbClassName="w-8 h-8 bg-[#D4AF37] text-white text-xs flex items-center justify-center rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E0E0E0] absolute top-1/2 transform -translate-y-1/2"
        trackClassName="h-2 bg-[#3E4C59]"
        renderTrack={(props, state) => {
          const { key, ...rest } = props;
          return (
            <div
              key={key}
              {...rest}
              className={`h-2 absolute top-1/2 transform -translate-y-1/2 ${
                state.index === 1 ? 'bg-[#D4AF37]' : 'bg-[#3E4C59]'
              }`}
            />
          );
        }}
        renderThumb={(props, state) => {
          const { key, ...rest } = props;
          return (
            <div key={key} {...rest}>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] px-2 py-1 rounded text-white">
                {state.valueNow.toLocaleString()}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
});

export default DoubleRangeSlider;