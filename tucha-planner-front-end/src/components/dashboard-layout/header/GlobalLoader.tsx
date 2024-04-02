'use client'

import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { Loader } from 'lucide-react'

export function GlobalLoader() {
	const isMutating = useIsMutating()
	const isFethcing = useIsFetching()
	return isFethcing || isMutating ? (
		<div className='fixed top-layout right-layout z-50'>
			<Loader />
		</div>
	) : null
}
