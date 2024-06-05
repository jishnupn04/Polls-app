from django.shortcuts import render,get_object_or_404
from django.db.models import F

# Create your views here.
from django.http import HttpResponse,HttpResponseRedirect,JsonResponse
from .models import Question,Choice,Tags
from django.urls import reverse
from django.views import generic
import json
from django.views.decorators.csrf import csrf_exempt
def get_polls():
    polls_list=[]
    polls=Question.objects.all()
    for poll in polls:
        poll_dict={
            "Question":poll.question_txt,
            "QuestionID":poll.id,
            "Tags":[],
            "OptionVote":{},
            "TotalVotes":0
        }
        tags=Tags.objects.filter(question=poll)
        for tag in tags:
          poll_dict["Tags"].append(tag.tag_name)
        choices=Choice.objects.filter(question_id=poll.id)
        totalVotes=0
        for choice in choices:
            poll_dict["OptionVote"][choice.choice_text]=choice.votes
            totalVotes+=choice.votes
        polls_list.append(poll_dict)
        poll_dict['TotalVotes']=totalVotes
    return(polls_list)

def get_views(request):
    polls_list=get_polls()
    return JsonResponse({"msg":"Fetched polls Succesfull","data":polls_list,"success":True})
@csrf_exempt
def post_view(request):
    
    if request.method == 'POST':
        data = json.loads(request.body)
        question_txt = data.get('Question', '')
        options = data.get('OptionVote', {})
        tags = data.get('Tags', [])
        question= Question.objects.create(question_txt=question_txt)
        for choice_text, votes in options.items():
            Choice.objects.create(question=question, choice_text=choice_text, votes=votes)
        for tag_text in tags:
            tag= Tags.objects.create(tag_name=tag_text)
            question.tags.add(tag)
        return JsonResponse({'msg': 'Poll created successfully.','success':True})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)

@csrf_exempt
def filter_view(request):
    polls_list=get_polls()
    tags_list = request.GET.get('tags') 
    print(tags_list)
    filtered_responses = []
    #print(polls_list)
    for polls in polls_list:           
        tags=polls['Tags']
        for tag in tags:     
            if tag in tags_list:
                filtered_responses.append(polls)
    return JsonResponse({"msg":"Fetched polls Succesfull","data":filtered_responses,"success":True})

@csrf_exempt
def view_details(request,question_id):
    if request.method == "PUT":
        question = get_object_or_404(Question, id=question_id)
        print(question)
        data = json.loads(request.body)
        option = data.get("incrementOption")
        print(option)
        increment_option = question.choice_set.get(choice_text=option)
        print(increment_option)
        increment_option.votes += 1
        increment_option.save()
        return JsonResponse({'msg':"Option vote incremented successfully","success":True}, status=200,safe=False)
    elif request.method=="GET":
        polls_list=get_polls()
        for polls in polls_list:
            if polls['QuestionID']==question_id:
                return JsonResponse({"msg":"Fetched polls Succesfull","data":polls,"success":True})
        else:
            return JsonResponse({'error':'Invald Id provided '},status=400)
    else:
        return JsonResponse({'error': 'Invalid request method. Only PUT requests are allowed.'}, status=400)

def tags_view(request):
    polls_list=get_polls()
    tags_list=[]
    for polls in polls_list:
        for tags in polls['Tags']:
            print(tags)
            if tags not in tags_list:
                tags_list.append(tags)
    return JsonResponse({"msg":"Fetched polls Succesfull","data":tags_list,"success":True})
    
class ResultsView(generic.DetailView):
    model=Question
    template_name="polls/results.html"

def vote(request, question_id):
    question=get_object_or_404(Question,pk=question_id)
    try:
        selected_choice=question.choice_set.get(pk=request.POST["choice"])
    except(KeyError, Choice.DoesNotExist):
        return render(
            request,"polls/detail.html",
            {
                "question":question,
                "error_message":"You didn't select a choice.",
            },
        )
    else:
        selected_choice.votes=F("votes")+1
        selected_choice.save()
        return HttpResponseRedirect(reverse("polls:results", args=(question.id,)))