import '@splidejs/react-splide/css';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { toast } from 'react-hot-toast';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const HomeBanner = ({ page_number }) => {

    const options = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        pagination: true,
        autoplay: false,
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
                                // banner.page_id === page_number
                                // &&
                                <SplideSlide className='col-lg-12 p-0' key={index} >
                                    <Link to={banner.link}>
                                        <img src={banner.image.url} alt="banner" className='img-fluid' style={{ height: "430px" }} title={banner.title}/>
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

export default HomeBanner