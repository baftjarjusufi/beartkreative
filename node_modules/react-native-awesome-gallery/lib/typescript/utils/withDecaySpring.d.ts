import type { WithDecayConfig, WithSpringConfig } from 'react-native-reanimated';
export declare function withDecaySpring(userConfig: WithDecayConfig & WithSpringConfig & {
    clamp: [number, number];
}, callback?: (finished?: boolean) => void): number;
