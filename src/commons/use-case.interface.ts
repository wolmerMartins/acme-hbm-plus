export interface IUseCase<TArgs, TResponse> {
  execute(args: TArgs): Promise<TResponse>
}
