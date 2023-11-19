const handleObjectState = (
	inputKey: string,
	newValue: any,
	callback: (existingProps: any) => void
) => {
	callback((existingProps: any) => {
		return {
			...existingProps,
			[inputKey]: newValue,
		}
	})
}

export default handleObjectState
