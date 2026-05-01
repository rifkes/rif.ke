const Button = ({ value, onClick, active, }) => {
	return (
		<button
			className='border border-black px-1 hover:bg-black hover:text-white cursor-pointer'
			style={{
				backgroundColor: active ? 'black' : 'white',
				color: active ? 'white' : 'black',
			}}
			key={value}
			onClick={onClick}
		>
			{value}
		</button>
	)
}

export default Button;