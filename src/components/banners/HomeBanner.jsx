import '@splidejs/react-splide/css';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { toast } from 'react-hot-toast';
import useFetch from '../../hooks/useFetch';

const HomeBanner = () => {

    const options = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        pagination: true,
        autoplay: false,
    };

    const [banners, loading, error] = useFetch("/api/v1/banner/list", "data");

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
                                <SplideSlide className='col-lg-12 p-0' key={index}>
                                    <img src={banner.image} alt="banner" className='img-fluid' style={{ height: "430px" }} />
                                </SplideSlide>
                            )
                        )
                    }
                </SplideTrack>
            </Splide>
        </div>
    )
}

export default HomeBanner