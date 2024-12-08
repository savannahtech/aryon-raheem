jest.mock('@iconify/react', () => ({
  Icon: ({ icon, ...props }: { icon: string }) => (
    <span data-testid="icon" {...props}>{icon}</span>
  )
}));
