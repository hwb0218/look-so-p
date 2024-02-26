import { Component } from 'react';
import type { ReactNode } from 'react';

import Wrapper from '../ui/wrapper';
import { Button } from '@components/ui/button';

interface Props {
  children: ReactNode;
  rejectedFallback: ReactNode;
  reset?: () => void;
}

interface State {
  hasError: boolean;
}
const initialState: State = {
  hasError: false,
};

class ErrorBoundary extends Component<Props, State> {
  state: State = initialState;

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  resetBoundary = () => {
    this.props.reset?.();
    this.setState(initialState);
  };

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div>{this.props.rejectedFallback}</div>
          <div>에러가 지속되면 고객센터로 문의하세요</div>
          <Wrapper className="mt-2">
            <Button type="button" onClick={this.resetBoundary}>
              다시 시도하기
            </Button>
          </Wrapper>
        </Wrapper>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
