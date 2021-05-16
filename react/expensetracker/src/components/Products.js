import Image from '../assets/deleteimg.png';

export default function Products(props) {
    const getDateTimeHandler = (date) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dateObj = new Date(date);
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate()).padStart(2, '0');
        const output = month + '\n' + day + ', ' + dateObj.toLocaleTimeString().slice(0, 5);
        return output;
    };

    const getNameToDisplay = (name) => {
        return name.length > 15 ? name.slice(0, 15) + '...' : name;
    };

    const products = props.items.map((item, index) => {
        return (
            <div key={index} className="product">
                <div className="deleteBin">
                    <button onClick={() => props.delete(index, item.price)}>
                        <img src={Image} alt="delete" />
                    </button>
                </div>
                <div className="prodInfo">
                    <p className="prodName">{getNameToDisplay(item.name)}</p>
                    <p className="prodPrice">{item.price}$</p>
                    <p className="date">{getDateTimeHandler(item.date)}</p>
                </div>
                <div className="line"></div>
            </div>
        )
    });

    const header = () => {
        return (
            <div className="headerProd">
                <p className="headerProdName">Name</p>
                <p className="headerProdPrice">Price</p>
            </div>
        )
    };

    const clearStorage = () => {
        props.clear();
    };

    const clearBtn = () => {
        return (
            <button onClick={clearStorage} className="buttonClass">Clear All</button>
        )
    }

    return (
        <div className="productsDiv">
            {products.length > 0 && header()}
            {products.length > 0 ? <hr/> : null}
            <div className="singleProd">
                {products}
            </div>
            {products.length > 0 && clearBtn()}
        </div>
    );
};