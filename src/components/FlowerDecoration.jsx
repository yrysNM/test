const FlowerDecoration = ({ className = "" }) => {
    return (
        <svg className={className} viewBox="0 0 800 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M400 20C310 20 250 80 120 80C50 80 0 60 0 60V100H800V60C800 60 750 80 680 80C550 80 490 20 400 20Z" fill="currentColor" fillOpacity="0.1" />
            <g opacity="0.5">
                <path d="M380 40C380 51.0457 371.046 60 360 60C348.954 60 340 51.0457 340 40C340 28.9543 348.954 20 360 20C371.046 20 380 28.9543 380 40Z" fill="white" />
                <path d="M460 40C460 51.0457 451.046 60 440 60C428.954 60 420 51.0457 420 40C420 28.9543 428.954 20 440 20C451.046 20 460 28.9543 460 40Z" fill="white" />
                <path d="M420 70C420 81.0457 411.046 90 400 90C388.954 90 380 81.0457 380 70C380 58.9543 388.954 50 400 50C411.046 50 420 58.9543 420 70Z" fill="white" />
            </g>
        </svg>
    )
}

export default FlowerDecoration
