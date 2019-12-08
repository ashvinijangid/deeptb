from django.http import HttpResponse, JsonResponse
from django.shortcuts import render


def homepage(request):
	if request.method == "GET":
		return render(request, 'index.html')
	else:
		print(request.FILES['img'].read())
		return JsonResponse({'data':'40'})