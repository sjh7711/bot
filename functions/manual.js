func = function (r) {
	if (r.msg.split(" ")[1] == "최근채팅") {
        r.replier.reply("최근채팅 6개를 출력합니다. [!최근채팅16]과 같이 입력하면 조회됩니다. 최대 16개까지 조회가 가능합니다. [!최근채팅16 닉네임] 과 같이 입력하면 해당 닉네임의 최근 16개 채팅을 보여줍니다.");
    } else if (r.msg.split(" ")[1] == "전체채팅") {
        r.replier.reply("[!전체채팅12,사람이름,방이름]");
    } else if (r.msg.split(" ")[1] == "오버워치") {
        r.replier.reply("[!오버워치 똥개#5468]와 같이 입력하면 티어,점수,경쟁전에서 가장 많이 플레이한 영웅 5명을 확인할 수 있습니다.\n배치를 치지 않은 경우, 프로필이 비공개인 경우, 배틀태그를 입력하지 않은 경우, 대소문자를 정확하게 구분하지 않은 경우엔 정보를 알 수 없습니다.");
    } else if (r.msg.split(" ")[1] == "!번역") {
        r.replier.reply("[!번역 한영,안녕]과 같이 입력하면 한글을 영어로 변역해줍니다. 영 한 일 을 지원합니다.");
    } else if (r.msg.split(" ")[1] == "!업무") {
        r.replier.reply("[!업무 지역]을 입력하면 관련된 사업장을 보여줍니다.");
    } else if (r.msg.split(" ")[1] == "로또") {
        r.replier.reply("로또번호를 추천해줍니다. [!로또 5] 와 같이 5장까지는 뽑은 번호를 바로 알려주고 5장 초과 10000장 이하의 경우 뽑은 데이터는 저장되고 별도로 알려주지는 않습니다. [!당첨]으로 토요일에 로또번호 추첨이 끝나면 결과를 확인할 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "당첨") {
        r.replier.reply("매주 토요일에 로또번호가 발표가 되면 지난 일주일간 뽑았던 번호가 몇등인지 알 수 있습니다. [!당첨 닉네임] 과 같이 입력하면 자기가 뽑은 번호만 확인 할 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "로또개수목록") {
        r.replier.reply("이번주에 로또 뽑은 개수의 리스트입니다.");
    } else if (r.msg.split(" ")[1] == "로또통계") {
        r.replier.reply("지금까지 뽑았던 로또의 당첨내역을 확인할 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "종합로또통계") {
        r.replier.reply("피치봇이 들어있는 모든방에서 뽑은 로또의 통계입니다.");
    }  else if (r.msg.split(" ")[1] == "행복회로") {
        r.replier.reply("이번주에 뽑은 번호가 저번주에 뽑았다면 몇 등일지 보여줍니다.");
    } else if (r.msg.split(" ")[1] == "메뉴") {
        r.replier.reply("먹을 음식을 추천해 줍니다. [!메뉴 3]과 같이 입력하면 메뉴를 3개 추천해줍니다. 최대 8개를 추천해줍니다.");
    } else if (r.msg.split(" ")[1] == "식당") {
        r.replier.reply("시립대 주변 식당을 추천해 줍니다. [!식당 3]과 같이 입력하면 식당을 3개 추천해줍니다. 최대 8개를 추천해줍니다.");
    } else if (r.msg.split(" ")[1] == "햄버거") {
        r.replier.reply("롯데리아, 맘스터치, 맥도날드의 햄버거 중 하나를 추천 해줍니다.");
    } else if (r.msg.split(" ")[1] == "서브웨이") {
        r.replier.reply("서브웨이 랜덤 메뉴를 추천해줍니다.\n빵 : 기본 (50% 확률) or 다른 빵\n야채 : 4 ~ 6개\n소스 : 0 ~ 2개\n치즈 : 0 ~ 1개");
    } else if (r.msg.split(" ")[1] == "유튜브") {
        r.replier.reply("[!유튜브 제목] 과 같이 검색하면 유튜브 링크를 보여줍니다. 기본값은 관련성이 가장 높은 영상이지만 원하는 영상이 나오지 않을 경우 [/유튜브 제목] 과 같이 검색하면 조회수가 가장 높은 영상을 보여줍니다.");
    } else if (r.msg.split(" ")[1] == "노래") {
        r.replier.reply("벅스 TOP100 중 한 곡을 추천해줍니다.");
    } else if (r.msg.split(" ")[1] == "제이플라") {
        r.replier.reply("최신 제이플라 노래를 보여줍니다.");
    } else if (r.msg.split(" ")[1] == "공지") {
        r.replier.reply("최근 5개의 공지를 띄워줍니다. [!공지 15] 과 같이 입력하면 공지 15개를 보여주고 최대 15개까지 조회가능합니다. 해당 공지의 번호를 [!공지 823] 이렇게 입력하시면 내용과 댓글을 확인할 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "날씨") {
        r.replier.reply("[!날씨 지역명]으로 검색가능하며 경우에 따라 선택을 해야할 수도 있습니다. 기본값은 해당 방과 가장 관련있는 지역입니다.");
    } else if (r.msg.split(" ")[1] == "건의") {
        r.replier.reply("건의를 받습니다. [!건의 건의내용] 으로 입력하면 됩니다.");
    } else if (r.msg.split(" ")[1] == "추첨") {
        r.replier.reply("[!추첨]을 입력하면 몇 명을 뽑을 건지 입력할 수 있습니다. 숫자만 입력하면 됩니다. 입력 후에는 누구든지 [참가] 를 입력하면 참가가 가능하고, 추첨을 제안한 사람이 [!마감 ]을 입력하면 당첨자가 바로 발표됩니다.\n추첨이 진행중일 땐 다른 추첨이 불가능합니다. 누구든 [!추첨]이 입력된 후 90초 이후엔 [!마감]이 가능합니다.");
    } else if (r.msg.split(" ")[1] == "명단") {
        r.replier.reply("푸드뱅크 명단을 보여줍니다. [!명단 만월] 처럼 입력하면 만월노인요양원의 검색 결과가 나옵니다.");
    } else if (r.msg.split(" ")[1] == "맛집") {
        r.replier.reply("검색한 지역의 맛집을 알려줍니다. [!맛집 지역명] 으로 검색하면 됩니다.");
    } else if (r.msg.split(" ")[1] == "주사위"){
    	r.replier.reply("기본값은 1~100이고 [!주사위 200] 처럼하면 1~200까지, [!주사위 2 200] 처럼하면 2부터 200까지 랜덤한 숫자를 뽑습니다.");
    } else if (r.msg.split(" ")[1] == "야구"){
    	var str = '';
    	str += '숫자야구 룰\n'+es+'\n';
    	str += '여러분들은 [!야구] 를 통해 게임을 시작 할 수 있으며 [!야구] 를  외친 사람은 자동으로 참가가 됩니다.';
    	str += '[참가] 를 입력하면 참가가 가능하고 [!야구] 를 외친 사람이 [시작] 이라고 입력하면 게임을 시작합니다.\n';
    	str += '참가한 순서대로 맞출 수 있는 기회가 부여됩니다. 숫자는 중복되지 않는 0~9까지의 숫자입니다. 맞출 숫자가 1325라고 가정합니다.\n';
    	str += '[1246]이라고 질문을 합니다. 1은 위치와 숫자가 같으므로 스트라이크, 2는 위치는 다르지만 포함은 되어있으니 볼입니다. 4와 6은 아무것도 해당되지 않습니다.\n';
    	str += '단서를 통해 정답인 1325를 맞추면 됩니다. 참가비는 1000point입니다. 1000point아래로 내려가면 별도의 안내가 있을 예정입니다.\n';
    	str += '최대 3인까지 가능하며 혼자서도 가능하지만 전적은 기록되지 않습니다.\n';
    	str += '[!야구정보]를 통해 자신의 각종 정보를 확인할 수 있습니다.\n';
    	str += '[!야구랭킹]을 통해 point가 가장 많은 순서대로 등수 조회가 가능합니다.\n';
    	str += '[!야구종료]를 통해 게임을 강제로 종료할 수 있습니다. 혼자 플레이 중인 경우 아무나 종료 가능하고 2인 이상일 경우 현재 참가중인 플레이어 중에서만 강제종료가 가능합니다.\n';
    	str += '[!패스]를 통해 상대방이 30초 이상 답하지 않을 경우 그 다음 턴으로 차례를 넘길 수 있습니다.\n';
    	str += '[!힌트]를 통해 8번째 턴 부터 500포인트를 사용하여 숫자 하나에 대한 정보를 얻을 수 있습니다. 힌트를 쓰는 즉시 포인트는 차감되기 때문에 강제종료를 하더라도 포인트는 돌아오지 않습니다. 신중하게 사용해주세요.\n';
    	str += '[!전적초기화]를 통해 현재 포인트에서 2000점이 차감된 상태로 전적을 초기화 할 수 있습니다. 최대 2회까지 가능합니다.\n';
    	str += '[!야구방]을 통해 야구 전용방에 들어갈 수 있습니다.';
    	r.replier.reply(str);
    } else if (r.msg.split(" ")[1] == "블랙잭"){
    	var str = '';
    	str += '블랙잭 룰\n'+es+'\n';
    	str += '여러분들은 [!블랙잭] 을 통해 게임을 시작 할 수 있으며 [!블랙잭] 을  외친 사람은 자동으로 참가가 됩니다. 최대 5인까지 가능합니다.\n\n';
    	str += '배당율은 기본 1배입니다. 블랙잭인 경우 1.5배입니다. 카드 숫자의 합이 21에 가까운 사람이 이기는 게임입니다. K, Q, J는 10에 해당하며, A는 11로 계산되지만 A를 포함하여 21을 넘기는 경우 1로 계산됩니다.\n\n';
    	str += '카드 두 장을 기본적으로 지급받게 되며, 처음 받은 2장 합쳐 21이 나오는 경우 블랙잭이 되며 21이 되지 않았을 경우 원한다면 얼마든지 카드를 계속 뽑을 수 있습니다. 카드를 추가로 받아 21이 되는 경우는 블랙잭이 아닙니다.\n';
    	str += '21을 초과하게 되었을 경우에는 <Bust> 라고 하며 딜러의 결과에 관계없이 무조건 건 금액을 잃게 됩니다. <Push>는 딜러와 무승부인 상황일 경우입니다. 이 경우 배팅액을 그대로 돌려받습니다.\n\n';
    	str += '딜러의 오픈카드가 10, J, Q, K 일 떈, 딜러가 블랙잭인지 아닌지 말을 해줍니다. 딜러의 오픈카드가 A일 경우 <Insurance>를 설정할 수 있습니다.\n';
    	str += '<Insurance>는 보험입니다. 딜러의 오픈된 카드가 A일 경우, 딜러가 블랙잭이 나올 가능성에 대비해 보험을 들어두는 것입니다. 자기가 배팅한 금액의 절반을 추가로 내고 보험에 들 수 있습니다. 만약 딜러가 블랙잭이면 보험금과 보험금의 2배를 돌려받습니다. 배팅한 금액은 잃습니다.\n';
    	str += '만약 딜러가 블랙잭이 아니면 보험금은 소멸합니다. 그리고 게임을 계속 진행합니다.\n';
    	str += '<EvenMoney>는 플레이어가 블랙잭이고 딜러의 오픈된 카드 한장이 A일 때 같은 블랙잭으로 무승부 되는 경우를 대비한 보험입니다. 베팅한 금액과 동일한 금액을 승리수당으로 받고 게임을 종료할 것인지, 아니면 블랙잭의 효과(1.5배)를 그대로 유지하면서 게임을 계속 진행할 것인지에 대해 선택을 하는 것입니다.\n';
    	str += '딜러가 블랙잭인 경우 플레이어는 블랙잭이 아닌 이상 모두 바로 패배처리됩니다. 같은 블랙잭이면 배팅한 금액을 그대로 돌려받습니다. 플레이어가 블랙잭인 경우 딜러가 블랙잭이 아닌 이상 승리합니다.\n\n';
    	str += '[참가] 를 입력하면 참가가 가능하고 참여자 중 아무나 [시작] 이라고 입력하면 게임을 시작합니다.\n';
    	str += '처음엔 베팅할 금액을 정합니다. 1만원~1000만원의 배팅이 가능합니다. 1~1000의 숫자 또는 10000~10000000의 숫자를 입력하면 됩니다.\n\n';
    	str += '[힛]은 카드를 한 장 더 받는 것입니다.\n';
    	str += '[스테이]는 카드를 더 이상 받지 않겠다는 의미입니다.\n';
    	str += '[더블다운]은 카드를 무한정 받지 못하고 카드를 단 한 장만 더 받습니다. 배팅액을 두 배로 늘립니다.\n';
    	str += '[스플릿]은 같은 숫자인 카드를 받았을 경우 두 장을 나눠서 따로 게임을 진행하는 것입니다. 현재 진행중인 패의 상황이 종료되면 그 다음 패가 공개됩니다. 게임을 따로 진행하는 만큼 배팅액을 추가로 걸게됩니다. A를 제외한 나머지 카드들은 스플릿을 3번 까지 할 수 있습니다.';
    	str += 'A는 1번만 가능합니다. 스플릿해서 나온 블랙잭은 블랙잭이 아닌 21로 계산됩니다. 스플릿을 하게 되면 기본적으로 2장을 채우기 위해 카드를 하나씩 더 받게됩니다.\n';
    	str += '[서렌더]는 현재 게임을 포기하는 것 입니다. 배팅액의 절반을 돌려받고 게임을 포기합니다.\n\n';
    	str += '[!블랙잭종료]를 통해 게임을 강제로 종료할 수 있습니다.\n';
    	str += '[!블랙잭정보]를 통해 본인의 게임 정보를 알 수 있습니다.\n';
    	str += '[!블랙잭랭킹]을 통해 자산순위를 확인할 수 있습니다.\n';
    	str += '[!블랙잭방]을 통해 블랙잭 전용방에 들어갈 수 있습니다.\n';
    	str += '[!블랙잭자동배팅 금액]을 통해 자기 배팅금액을 고정시킬 수 있습니다.\n';
    	str += '[!블랙잭대출 금액]을 통해 최대 10억까지 대출이 가능하며 대출할 때는 1만원~1억원 대출이 가능합니다.\n';
    	str += '[!블랙잭상환 금액]을 통해 자신이 대출 한 돈을 상환할 수 있습니다.\n';
    	str += '게임을 시작할 때 [!블랙잭 금액]을 입력하면 블랙잭 금액단계에 돈을 입력하지 않아도 됩니다. 참가도 마찬가지로 [참가 금액]을 입력하면 본인의 배팅금액 입력단계를 생략할 수 있습니다.\n';
    	str += '특징 : 매 게임마다 덱은 초기화되며 덱은 1팩으로 진행됩니다.';
    	r.replier.reply(str);
    	java.lang.Thread.sleep(100);
    	r.replier.reply('추가설명 / https://namu.wiki/w/블랙잭(카드게임)');
    }
}


