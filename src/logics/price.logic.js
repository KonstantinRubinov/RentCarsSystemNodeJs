function DifferenceBetweenDatesInDays(date2, date1)
{
    var difference_In_Time = new Date(date2).getTime() - new Date(date1).getTime();
    var difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
    return difference_In_Days;
}


function CarPrice(start, end, dayPrice)
{
	if (start != null && end != null)
	{
		price = DifferenceBetweenDatesInDays(end, start) * dayPrice;
		console.debug("The price is: " + price);
		return price;
	} else {
		console.debug("The price is: " + 0);
		return 0;
	}
}

function TotalPrice(start, end, realEnd, dayPrice, lateDayPrice)
{
	price = 0;
	latePrice = 0;
    price = CarPrice(start, end, dayPrice);

    let difference_In_Days = DifferenceBetweenDatesInDays(realEnd, end)


	if (difference_In_Days > 0)
	{
		latePrice = CarPrice(end, realEnd, lateDayPrice);
		console.debug("The late price is: " + latePrice);
	}
	console.debug("The total price is: " + price + latePrice);
	return price + latePrice;
}


module.exports ={
    TotalPrice:TotalPrice,
    CarPrice:CarPrice,
    DifferenceBetweenDatesInDays,DifferenceBetweenDatesInDays
};