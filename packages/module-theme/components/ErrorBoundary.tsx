import { Component, ReactNode } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface IProps extends WithTranslation {
  prop?: any;
  hasError: boolean;
  children?: ReactNode;
}

class ErrorBoundary extends Component<IProps, any> {
  constructor(props: any) {
    super(props);
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // You can use your own error logging service here
    // eslint-disable-next-line no-console
    console.log(`${error}`);
  }

  handleResetError = () => {
    this.setState({ hasError: false });
  };
  render() {
    if (this.state.hasError) {
      return <div></div>;
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
