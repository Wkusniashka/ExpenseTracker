export default function Header (props) {
    return (
        <div className="header">
            <div>
                <h4>INCOME</h4>
                <p style={{color:"green"}}>{props.income}</p>
            </div>
            <hr />
            <div>
                <h4>EXPENSE</h4>
                <p style={{color:"red"}}>{props.expense}</p>
            </div>
        </div>
    )
}