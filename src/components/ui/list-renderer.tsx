import { Component, ErrorInfo, ReactNode } from "react";

/**
 * Props interface for ErrorBoundary component
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * State interface for ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Error Boundary Component to catch and handle rendering errors
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Static method to update state when an error occurs
   * @param error - The error that occurred
   * @returns New state with error flag
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error("Error caught by ErrorBoundary:", error);
    return { hasError: true };
  }

  /**
   * Lifecycle method called when an error occurs during rendering
   * @param error - The error that occurred
   * @param errorInfo - Additional error information
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ListRenderer Error Details:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || <div className="error-boundary-fallback">Something went wrong. Please try again.</div>
      );
    }

    return this.props.children;
  }
}

/**
 * Props interface for ListRenderer component
 */
interface ListRendererProps<T> {
  /** Array of items to render */
  data?: T[];
  /** Function to render each item */
  renderItem: (item: T, index: number) => ReactNode;
  /** Loading state component */
  loadingState?: ReactNode;
  /** Whether the list is currently loading */
  isLoading?: boolean;
  /** Empty state component when no items */
  emptyState?: ReactNode;
  /** CSS class name for the container */
  className?: string;
  /** Function to extract unique key for each item */
  keyExtractor?: (item: T, index: number) => string;
  /** Error fallback component */
  errorFallback?: ReactNode;
  /** Optimistic data to display immediately */
  optimisticData?: T[];
}

/**
 * Generic List Renderer Component with error boundary and optimistic updates
 * @param props - Component props
 * @returns Rendered list component
 */
const ListRenderer = <T,>({
  data = [],
  renderItem,
  loadingState,
  isLoading = false,
  emptyState,
  className = "",
  keyExtractor,
  errorFallback,
  optimisticData = [],
}: ListRendererProps<T>): ReactNode => {
  // Combine optimistic data with actual data
  const combinedData = [...optimisticData, ...data];

  // Show loading state
  if (isLoading) {
    return <div className={className}>{loadingState}</div>;
  }

  // Show empty state if no data
  if (!combinedData.length && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <ErrorBoundary fallback={errorFallback}>
      <div className={className}>
        {combinedData.map((item, index) => {
          const key = keyExtractor ? keyExtractor(item, index) : `list-item-${index}`;

          return <div key={key}>{renderItem(item, index)}</div>;
        })}
      </div>
    </ErrorBoundary>
  );
};

export default ListRenderer;
