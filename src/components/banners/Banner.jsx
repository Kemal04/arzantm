import '@splidejs/react-splide/css';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { toast } from 'react-hot-toast';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Banner = ({ page_name }) => {

    const options = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        pagination: true,
        arrows:false,
        autoplay: true,
        autoplaySpeed: 1,
        speed: 1000,
    };

    const [banners, loading, error] = useFetch("/api/v1/banner", "data");

    if (error) {
        toast.error(error.message);
    }

    return (
        <div className='container p-0 text-center mt-3'>
            <Splide options={options} hasTrack={false}>
                <SplideTrack className='row g-0'>
                    {
                        loading ? (
                            <SplideSlide>Loading...</SplideSlide>
                        ) : (
                            banners.map((banner, index) =>
                                banner.platform[0].name === "WEB"
                                &&
                                banner?.page_category[0].page?.name === page_name
                                &&
                                <SplideSlide className='col-lg-12 p-0' key={index} >
                                    <Link target='_blank' to={banner.url}>
                                        <img src={'http://95.85.126.113/' + banner.image.url} alt="banner" className='img-fluid' style={{ height: "430px" }} title={banner.title} />
                                    </Link>
                                </SplideSlide>
                            )
                        )
                    }
                </SplideTrack>
            </Splide>
        </div >
    )
}

export default Banner