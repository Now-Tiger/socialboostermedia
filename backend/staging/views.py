from __future__ import annotations

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response


class StagingListCreateApiView(APIView):

    def get(self, req: Request, *args, **kwargs) -> Response:
        """
        Simple health-check end point
        """
        return Response({'success': True, 'message': 'Health check done!'}, status=status.HTTP_200_OK)


class StagingCreateUpdateApiView(APIView):

    def get(self, req: Request, pk: str) -> Response:
        """
        Dummy data get api by ID
        """
        if db.get('id', '') == pk:
            return Response({'success': True, 'data': db.get('service', '')}, status=status.HTTP_200_OK)

        return Response({'success': False, 'message': 'Data not found.'}, status=status.HTTP_404_NOT_FOUND)


db = {'id': '1', 'service': 'Email Logs'}
