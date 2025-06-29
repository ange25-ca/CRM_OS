import React, { useEffect } from 'react';
import { View } from 'react-native';
import PermissionItem from '../molecules/PermissionItem';
import { allPermissions } from '../../../Permissions/domain/permissionRegistry';
import { usePermissionsStore } from '../../../Permissions/infra/permissionsStore';

export default function PermissionsList() {
  /*Se obtiene el estado y estatus del store*/  
  const { statuses, request, evaluate } = usePermissionsStore();

  /*En caso de montar decordatorios */
  useEffect(() => {
    evaluate();
  }, [evaluate]);

  return (
    <View>
      {allPermissions.map(p => (
        <PermissionItem
          key={p.id}
          label={p.label}
          /*Se marca el switch debendiendo del caso que sea (false o true) */
          isGranted={statuses[p.id] === true}
          onToggle={() =>
            statuses[p.id] ? undefined : request(p.id)
          }
        />
      ))}
    </View>
  );
}
