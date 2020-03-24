$.ajax({
	url : 'https://coronavirus-ph-api.now.sh/cases',
	method : 'get',
	success:function(data){
		// console.log(data)
		var date = new Date();
		var Month = date.getMonth() + 1;
		var Day = date.getDate();
		var Year = date.getFullYear();

		if (Month < 10) {
			Month = 0+''+Month;
		}

		if (Day < 10) {
			Day = 0+''+Day;
		}
		var new_cases = 0;
		var now_date = Year+'-'+Month+'-'+Day;
		var total_case = data.length;
		var total_recoverd = 0;
		var total_dead = 0;


		for (i = 0; i < total_case; i++)
		{
			if (data[i]['date'] == now_date) {
				new_cases++;
			}

			// console.log(data[i]['nationality'])
			if (data[i]['status'] == "Recovered") {
				total_recoverd++;
			} else if (data[i]['status'] == "Died") {
				total_dead++;
			}
		}
		

		$('#total-case').html(total_case);

		count_anim(0,total_case,$('#total-case'))
		count_anim(0,total_recoverd,$('#total-recoverd'))
		count_anim(0,total_dead,$('#total-death'))
		$('#new_cases').html(new_cases)
		// $('#total-recoverd').html(total_recoverd);
	}
})


function count_anim(num,max,id) {
	if (num < max) {
		num++;
		id.html(num)
		setTimeout(function(){
			return count_anim(num,max,id)
		},5)
	}
}

$.ajax({
	url : 'https://coronavirus-ph-api.now.sh/test-results',
	method : 'get',
	success:function(data){

		count_anim(0,data['confirmed_cases'],$('#total-confirm'))
		count_anim(0,data['cases_tested_negative'],$('#total-test-negative'))
		count_anim(0,data['cases_pending_test_results'],$('#total-pening-test'))
	}
})



$.ajax({
	url : 'https://coronavirus-ph-api.now.sh/cases-outside-ph',
	method : 'get',
	success:function(data){

		// console.log(data)

		for(i = 0; i < data.length; i++)
		{

			if (data[i]['died'] == null) {
				var died = 1;
			} else {
				var died = data[i]['died'];
			}

			if (i % 2 == 0) {
				

				$('tbody').append('<tr style="background:#171717">'+
						'<td>'+data[i]['country_territory_place']+'</td>'+
						'<td>'+data[i]['confirmed']+'</td>'+
						'<td>'+died+'</td>'+
						'<td>'+data[i]['recovered']+'</td>'+
					'</tr>')
			} else {
				$('tbody').append('<tr>'+
						'<td>'+data[i]['country_territory_place']+'</td>'+
						'<td>'+data[i]['confirmed']+'</td>'+
						'<td>'+died+'</td>'+
						'<td>'+data[i]['recovered']+'</td>'+
					'</tr>')
			}

		}
	}
})

