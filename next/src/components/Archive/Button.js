const Button = ({ value, onClick, active, }) => {
	return (
		<button
			className='border border-black px-1 hover:bg-black hover:text-white cursor-pointer'
			style={{
				backgroundColor: active ? 'black' : undefined,
				color: active ? 'white' : undefined,
			}}
			key={value}
			onClick={onClick}
		>
			{value}
		</button>
	)
}

export default Button;