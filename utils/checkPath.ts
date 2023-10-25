const checkPath = (currentPathname: string, paths: string[]) => {
	paths.map((path) => {
		if (currentPathname.startsWith(path)) {
			return true
		}
	})
	return false
}

export default checkPath
