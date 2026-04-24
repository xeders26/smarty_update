// 확장자를 명시적으로 적어서 Vite/Rollup이 절대 헷갈리지 않게 만듭니다!
import arduino_delay from './arduino_delay';

export const HelpData: Record<string, string> = {
  "arduino_delay": arduino_delay,
};