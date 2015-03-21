var rx = { names:['text','hex','chex'],
	
	// raw text
	text:{
		receive:function(data){
			var s = [];
			for (var i=0; i<data.length; i++)
				s.push( String.fromCharCode( (data[i] < 256) ? data[i] : 32 ) );
			return s.join('');
		}
	},
	
	// HEX
	hex:{
		cols:   32,
		col:    0,
		prefix: '',
		suffix: ' ',
		lf:     '\n',
		receive:function(data){
			var s = [];
			for (var i=0; i<data.length; i++){
				data[i] &= 0xFF;
				s.push( rx.hex.prefix, (data[i] < 16) ? '0' : '', data[i].toString(16).toUpperCase(), rx.hex.suffix );
				if (++rx.hex.col >= rx.hex.cols){
					rx.hex.col = 0;
					s.push(rx.hex.lf);
				}
			}
			return s.join('');
		}
	},

	// HEX C-style
	chex:{
		cols:   16,
		col:    0,
		prefix: '0x',
		suffix: ',',
		lf:     '\n',
		receive:function(data){
			var s = [];
			for (var i=0; i<data.length; i++){
				data[i] &= 0xFF;
				s.push( rx.hex.prefix, (data[i] < 16) ? '0' : '', data[i].toString(16).toUpperCase(), rx.hex.suffix );
				if (++rx.hex.col >= rx.hex.cols){
					rx.hex.col = 0;
					s.push(rx.hex.lf);
				}
			}
			return s.join('');
		}
	},
};


// TX filters
var tx = { names:['text','hex','script'],

	// raw text
	text:{
		send:function(t,data){
			var a = [];
			for (var i=0; i<t.length; i++) a.push( t.charCodeAt(i) & 0xFF );
			data.push(a);
			return data;
		}
	},
	
	// HEX string/array
	hex:{
		send:function(t,data){
			return data;
		}
	},
	
	// script evaluator
	script:{
		send:function(t,data){
			data = data;
			try { eval(t);
			} catch (e) {
				console.log('Script error: ' + e.message);
			}
			return data;
		}
	},
};

