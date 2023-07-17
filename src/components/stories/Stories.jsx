import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'

const Stories = () => {

    const option = {
        type: 'loop',
        perPage: 10,
        perMove: 1,
        pagination: false,
        autoplay: false,
        arrows: false,
        breakpoints:
        {
            991: { perPage: 10, gap: '1.5rem', },
            768: { perPage: 6, gap: '1.5rem', },
            575: { perPage: 4, gap: '1rem', },
        }
    };

    return (
        <div className='container mt-4'>
            {/* <Splide options={option} hasTrack={false}>
                <SplideTrack>
                    {
                        stories.map((story, index) => (
                            <SplideSlide key={index}>
                                <div className="card border-0 position-relative text-center mx-2" style={{ width: "80px" }}>
                                    <img src={story.img} alt="" className='img-fluid' />
                                    <div className='small mt-2'>{story.name}</div>
                                    <span className="position-absolute translate-middle badge rounded-pill px-1 bg-green" style={{ left: "75px", top: "13px" }}>
                                        {story.number}
                                    </span>
                                </div>
                            </SplideSlide>
                        ))
                    }
                </SplideTrack>
            </Splide> */}
        </div >
    )
}

export default Stories