Verifier = new function()
{
	var dayId;
	var monId;
	var yearId;

	this.init = function(day,mon,year)
	{
		dayId = "#" + day;
		monId = "#" + mon;
		yearId = "#" + year;

		$(dayId).change(function(){
			
			var dd = $(this).val();
			if(dd<1)
				$(this).val(1);
			else if(dd>31)
				$(this).val(31);
		});

		$(monId).change(function(){
			
			var dd = $(dayId).val();
			var mm = $(this).val();
			if(mm<1)
				$(this).val(1);
			else if(mm>12)
				$(this).val(12);
			else
			{
				if(mm==2)
				{
					if(dd>29)
						$(dayId).val(29);
				}
				else if(isThirty(mm))
				{
					if(dd>30)
						$(dayId).val(30);
				}
			}
		});

		$(yearId).change(function(){
			
			var yy = $(this).val();
			if(yy<1970)
				$(this).val(1970);
		});
	}

	this.isValid = function()
	{
		var dd = $(dayId).val();
		var mm = $(monId).val();
		var yy = $(yearId).val();

		if(dd<1 || dd>31)
			return false;

		if(mm<1 || mm>12)
			return false;

		if(mm==2)
		{
			if(!isLeap(yy) && dd==29)
				return false;
			return true;
		}

		if(isThirty(mm))
		{
			if(dd==31)
				return false;
			return true;
		}

		return true;
	}

	var isLeap = function(year)
	{
		if(year%4==0)
		{
			if(year%100==0)
			{
				if(year%400==0)
					return true;
				else
					return false;
			}
			else
				return true;
		}
		else
			return false;
	}

	var isThirty = function(mon)
	{
		var arr = [4,6,9,11];
		for(var i=0; i<4; i++)
			if(mon==[arr[i]])
				return true;
		return false;
	}

	this.getDate = function()
	{
		var dd = $(dayId).val();
		var mm = $(monId).val();
		var yy = $(yearId).val();

		if(dd<10)
			dd = "0" + dd;
		if(mm<10)
			mm = "0" + mm;
		return yy + "-" + mm + "-" + dd;
	}
}

$(function() {

	
});